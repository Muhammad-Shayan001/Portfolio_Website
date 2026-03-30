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
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
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
