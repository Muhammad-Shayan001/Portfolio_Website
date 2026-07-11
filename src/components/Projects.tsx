import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Github, ExternalLink, Code2, Rocket, Sparkles, Eye } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live: string;
  category: string;
  image: string;
  featured?: boolean;
  color: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Hospital Management System',
    description: 'A polished hospital management platform for appointments, patient records, staff coordination, and streamlined medical workflows.',
    tech: ['Next.js', 'React', 'Dashboard UI'],
    live: 'https://hospital-management-website-8c6lhq3h3.vercel.app/',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    featured: true,
    color: '#10b981',
  },
  {
    id: 2,
    title: 'School Management System',
    description: 'A modern school management experience with role-based dashboards, academic tracking, attendance, and communication tools.',
    tech: ['React', 'Management App', 'UI/UX'],
    live: 'https://skolic-schools-management-app.vercel.app/',
    category: 'Education',
    image: 'https://skolic-schools-management-app.vercel.app/images/dashboard.png',
    featured: true,
    color: '#38bdf8',
  },
  {
    id: 3,
    title: 'FJ Store',
    description: 'A modern e-commerce experience with a premium storefront, product discovery flow, and conversion-focused UI that feels polished on every screen.',
    tech: ['React', 'E-commerce', 'UI/UX'],
    github: 'https://github.com/Muhammad-Shayan001',
    live: 'https://fj-store.vercel.app/',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800',
    featured: true,
    color: '#fb923c',
  },
  {
    id: 4,
    title: 'Full Stack Online Store',
    description: 'A comprehensive full-stack online store with dynamic product listings, user authentication, and seamless checkout experience.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    github: 'https://github.com/Muhammad-Shayan001',
    live: 'https://online-store-2tw6.vercel.app/',
    category: 'Fullstack',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    color: '#8b5cf6',
  },
  {
    id: 5,
    title: 'Modern Portfolio',
    description: 'A highly interactive and visually stunning personal portfolio website featuring sleek animations and dark mode aesthetics.',
    tech: ['React', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/Muhammad-Shayan001',
    live: 'https://portfolio-website-ivory-one-64.vercel.app/',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    color: '#3b82f6',
  },
  {
    id: 6,
    title: 'Fashion E-commerce',
    description: 'An elegant fashion e-commerce platform with a minimalist design, advanced filtering, and smooth navigation.',
    tech: ['React', 'Node.js', 'Express'],
    github: 'https://github.com/Muhammad-Shayan001',
    live: 'https://fashion-store-two-navy.vercel.app/',
    category: 'Fullstack',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800',
    color: '#22d3ee',
  },
  {
    id: 7,
    title: 'Karachi BBQ Restaurant',
    description: 'A mouth-watering restaurant landing page with an interactive menu, reservations system, and beautiful food typography.',
    tech: ['React', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Muhammad-Shayan001',
    live: 'https://karachi-bbq.vercel.app/',
    category: 'Creative',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    color: '#f472b6',
  },
  {
    id: 8,
    title: 'AI Productivity Suite',
    description: 'A fast, thoughtful product experience focused on productivity tools, smart workflows, and modern dashboard storytelling.',
    tech: ['Next.js', 'AI', 'Design Systems'],
    github: 'https://github.com/Muhammad-Shayan001',
    live: 'https://portfolio-website-ivory-one-64.vercel.app/',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    color: '#818cf8',
  },
];

const categories = ['All', 'Healthcare', 'Education', 'Frontend', 'Fullstack', 'Creative', 'E-commerce'];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [12, -12]), springConfig);
  const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);

  // Spotlight gradient position
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, y: 30, scale: 0.9 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.12,
        ease: [0.23, 1, 0.32, 1]
      }}
      className={cn(
        "group relative",
        project.featured ? "md:col-span-2" : "col-span-1"
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
      style={{ perspective: 1000 }}
    >
      {/* Animated Gradient Border */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.8 : 0.2,
        }}
        className="absolute -inset-px rounded-[36px] overflow-hidden"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-50%] w-[200%] h-[200%]"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${project.color}60, transparent, ${project.color}30, transparent)`,
          }}
        />
      </motion.div>
      
      <motion.div 
        style={{ 
          rotateX, 
          rotateY,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: isHovered 
            ? `0 25px 70px rgba(0,0,0,0.4), 0 0 40px ${project.color}10` 
            : '0 10px 40px rgba(0,0,0,0.2)',
        }}
        className={cn(
          "relative rounded-[35px] overflow-hidden h-full flex flex-col z-10 transition-all duration-500",
          project.featured ? "lg:flex-row" : "flex-col"
        )}
      >
        {/* Spotlight Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at ${spotlightX.get()}% ${spotlightY.get()}%, ${project.color}08 0%, transparent 50%)`,
          }}
        />

        {/* Image Container */}
        <div className={cn(
          "relative overflow-hidden",
          project.featured ? "lg:w-1/2 aspect-16/10 lg:aspect-auto" : "aspect-16/10"
        )}>
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ x: imgX, y: imgY, scale: 1.1 }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#030014] via-[#030014]/40 to-transparent opacity-80" />
          
          {/* Hover Overlay */}
          <motion.div 
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center gap-4 backdrop-blur-sm"
            style={{ background: `${project.color}10` }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.05 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-xl"
              >
                <Github size={22} />
              </motion.a>
            )}
            <motion.a
              href={project.live}
              target="_blank"
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: project.github ? 0.1 : 0.05 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl text-white"
              style={{ background: project.color }}
            >
              <ExternalLink size={22} />
            </motion.a>
          </motion.div>
          
          {/* Category Badge */}
          <div 
            className="absolute top-5 left-5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {project.category}
          </div>
        </div>
        
        {/* Content */}
        <div className={cn(
          "p-8 sm:p-10 flex-1 flex flex-col relative",
          project.featured ? "lg:w-1/2" : "w-full"
        )}>
          {/* Tech Stack */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {project.tech.map((t) => (
              <span 
                key={t}
                className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: `${project.color}12`,
                  color: project.color,
                  border: `1px solid ${project.color}20`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          
          <h3 className={cn(
            "font-display font-black mb-3 group-hover:text-white transition-colors leading-tight",
            project.featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"
          )}>
            {project.title}
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
            {project.description}
          </p>
          
          <div className="flex items-center justify-between pt-5 border-t border-white/4">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
              <Sparkles size={14} style={{ color: project.color }} />
              <span>High Performance</span>
            </div>
            <motion.a
              href={project.live}
              target="_blank"
              whileHover={{ x: 4 }}
              className="text-white text-sm font-bold flex items-center gap-2 group/link"
            >
              <Eye size={16} className="group-hover/link:text-primary transition-colors" />
              Live Demo
              <Rocket size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform" style={{ color: project.color }} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(project => 
    activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="projects" className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#090b10] px-5 py-8 shadow-[0_25px_110px_rgba(0,0,0,0.35)] sm:px-8 lg:px-10 lg:py-10">
      <div className="absolute inset-0 overflow-hidden rounded-[32px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(108,79,224,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_30%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:42px_42px]" />
        <svg viewBox="0 0 600 600" className="absolute right-[-8%] top-[8%] h-[620px] w-[620px] rotate-3 opacity-[0.16] blur-3xl" aria-hidden="true">
          <path d="M314 72C404 86 463 149 464 230C465 311 413 381 335 408C257 434 167 415 115 357C63 299 59 208 111 147C162 89 223 60 314 72Z" fill="rgba(255,255,255,0.7)" />
          <path d="M312 140C367 150 410 189 412 239C414 289 383 337 336 355C289 373 232 362 193 330C154 297 139 251 152 203C165 155 224 130 312 140Z" fill="rgba(255,255,255,0.34)" />
        </svg>
        <div className="absolute right-[8%] top-[16%] h-[220px] w-[220px] rounded-full border border-white/10" />
        <motion.div animate={{ opacity: [0.3, 0.74, 0.3], y: [0, -9, 0], rotate: [14, 24, 14] }} transition={{ duration: 9.2, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-[12%] left-[10%] h-12 w-12 rounded-[16px] shadow-[0_0_24px_rgba(34,211,238,0.16)]" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.38), rgba(139,92,246,0.16))', clipPath: 'polygon(50% 0%, 100% 35%, 70% 100%, 30% 100%, 0% 35%)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary"
            >
              <Rocket size={14} />
              <span className="glow-text">My Portfolio</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-black text-white sm:text-5xl lg:text-6xl"
            >
              Selected <span className="text-gradient">Projects</span>
            </motion.h2>
            <svg viewBox="0 0 180 20" className="mb-6 h-6 w-32" aria-hidden="true">
              <path d="M4 10C24 2 43 2 64 10C82 17 102 17 122 10C139 4 159 4 176 10" stroke="url(#projectSquiggle)" strokeWidth="2.7" strokeLinecap="round" fill="none" />
              <defs>
                <linearGradient id="projectSquiggle" x1="0%" y1="0%" x2="100%" y2="0%">
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
              className="max-w-xl text-base text-slate-400 sm:text-lg"
            >
              A curated collection of my best work across healthcare, education, and full-stack product experiences.
            </motion.p>
          </div>
          
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-xl"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 relative uppercase tracking-wider",
                  activeCategory === category 
                    ? "text-white" 
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                )}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-xl -z-10"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                      boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
                    }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.18)] sm:p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3">Featured Launch</p>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-3">FJ Store — a premium storefront experience</h3>
              <p className="text-slate-400 leading-relaxed">This project highlights the kind of polished, conversion-focused interface I love building for modern brands and online businesses.</p>
            </div>
            <a href="https://fj-store.vercel.app/" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition-all hover:border-primary/50 hover:text-white">
              View live demo
              <Rocket size={14} className="text-primary" />
            </a>
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid gap-6 md:grid-cols-2 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
