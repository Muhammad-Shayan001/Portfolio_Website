import { motion } from 'motion/react';
import { Layout, Server, Wrench, Database, Globe, Cpu } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const skillCategories = [
  {
    title: 'Frontend',
    icon: <Layout size={24} />,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Backend',
    icon: <Server size={24} />,
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Firebase', 'GraphQL'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Tools & Others',
    icon: <Wrench size={24} />,
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Jest', 'CI/CD'],
    color: 'from-orange-500 to-yellow-500',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#090b10] px-5 py-8 shadow-[0_25px_110px_rgba(0,0,0,0.35)] sm:px-8 lg:px-10 lg:py-10">
      <div className="absolute inset-0 overflow-hidden rounded-[32px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(108,79,224,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.1),transparent_30%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:42px_42px]" />
        <svg viewBox="0 0 600 600" className="absolute left-[-10%] top-[6%] h-[620px] w-[620px] rotate-6 opacity-[0.14] blur-3xl" aria-hidden="true">
          <path d="M300 76C388 87 451 148 454 228C457 308 405 375 327 400C249 425 161 411 106 353C52 295 51 206 104 143C157 80 220 64 300 76Z" fill="rgba(255,255,255,0.7)" />
          <path d="M300 142C355 152 398 188 403 239C408 290 378 338 331 354C284 371 226 360 188 329C150 298 136 246 149 201C162 156 221 131 300 142Z" fill="rgba(255,255,255,0.34)" />
        </svg>
        <div className="absolute bottom-[8%] right-[8%] h-[220px] w-[220px] rounded-full border border-white/10" />
        <motion.div animate={{ opacity: [0.3, 0.74, 0.3], y: [0, -8, 0], rotate: [10, 18, 10] }} transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[8%] top-[18%] h-12 w-12 rounded-[16px] shadow-[0_0_24px_rgba(16,185,129,0.16)]" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.38), rgba(139,92,246,0.16))', clipPath: 'polygon(50% 0%, 100% 35%, 70% 100%, 30% 100%, 0% 35%)' }} />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-primary font-bold tracking-widest uppercase text-xs mb-4"
          >
            <Cpu size={14} />
            <span>My Expertise</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            Technical <span className="text-gradient">Arsenal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            A comprehensive set of tools and technologies I use to bring ideas to life. 
            Constantly learning and evolving with the digital landscape.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[40px] -z-10 blur-2xl" />
              
              <div className="glass p-10 rounded-[40px] h-full border border-white/5 hover:border-white/20 transition-all duration-500 group-hover:-translate-y-2">
                <div className={cn(
                  "w-16 h-16 rounded-3xl bg-gradient-to-br flex items-center justify-center text-white mb-8 shadow-lg shadow-black/20",
                  category.color
                )}>
                  {category.icon}
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-6">{category.title}</h3>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (j * 0.05) }}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Decorative Background Icons */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-20 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 animate-float"><Database size={120} /></div>
          <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: '2s' }}><Globe size={100} /></div>
        </div>
      </div>
    </section>
  );
}
