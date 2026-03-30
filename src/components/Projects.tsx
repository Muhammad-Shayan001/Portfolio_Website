import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Github, ExternalLink, Code2, Rocket, Sparkles, Eye } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Store',
    description: 'A full-featured e-commerce platform with real-time inventory management, secure payment processing via Stripe, and a modern admin dashboard for analytics.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com/Muhammad-Shayan001/E-Commerce-Store',
    live: '#',
    category: 'Fullstack',
    image: 'https://picsum.photos/seed/ecommerce/1200/800',
    featured: true,
    color: '#8b5cf6',
  },
  {
    id: 2,
    title: 'Quiz App',
    description: 'An interactive quiz application with multiple categories, real-time scoring engine, and a competitive leaderboard with persistent rankings.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com/Muhammad-Shayan001/Quiz_App',
    live: '#',
    category: 'Frontend',
    image: 'https://picsum.photos/seed/quiz/800/600',
    color: '#3b82f6',
  },
  {
    id: 3,
    title: 'TODO App',
    description: 'A productivity-focused task management tool with drag-and-drop sorting, smart categorization, and local persistence for offline use.',
    tech: ['React', 'Redux', 'LocalStorage'],
    github: 'https://github.com/Muhammad-Shayan001/TODO-App',
    live: '#',
    category: 'Frontend',
    image: 'https://picsum.photos/seed/todo/800/600',
    color: '#22d3ee',
  },
  {
    id: 4,
    title: 'Gift Web 33',
    description: 'A premium gift-giving platform with personalized AI recommendations, animated gift reveals, and futuristic glassmorphic UI design.',
    tech: ['Next.js', 'Framer Motion', 'Three.js'],
    github: 'https://github.com/Muhammad-Shayan001/Gift_Web_33',
    live: '#',
    category: 'Creative',
    image: 'https://picsum.photos/seed/gift/800/600',
    color: '#f472b6',
  },
];

const categories = ['All', 'Frontend', 'Fullstack', 'Creative'];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
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
        className="absolute -inset-[1px] rounded-[36px] overflow-hidden"
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
          project.featured ? "lg:w-1/2 aspect-[16/10] lg:aspect-auto" : "aspect-[16/10]"
        )}>
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ x: imgX, y: imgY, scale: 1.1 }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/40 to-transparent opacity-80" />
          
          {/* Hover Overlay */}
          <motion.div 
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center gap-4 backdrop-blur-sm"
            style={{ background: `${project.color}10` }}
          >
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
            <motion.a
              href={project.live}
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
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
          
          <div className="flex items-center justify-between pt-5 border-t border-white/[0.04]">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
              <Sparkles size={14} style={{ color: project.color }} />
              <span>High Performance</span>
            </div>
            <motion.a
              href={project.github}
              target="_blank"
              whileHover={{ x: 4 }}
              className="text-white text-sm font-bold flex items-center gap-2 group/link"
            >
              <Eye size={16} className="group-hover/link:text-primary transition-colors" />
              View Project
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
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
            >
              <Rocket size={14} />
              <span className="glow-text">My Portfolio</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-4"
            >
              Featured <span className="text-gradient">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 max-w-xl text-base sm:text-lg"
            >
              A curated collection of my best work — from complex full-stack apps to creative frontend experiments.
            </motion.p>
          </div>
          
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 p-1.5 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
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
          layout
          className="grid md:grid-cols-2 gap-6 sm:gap-8"
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
