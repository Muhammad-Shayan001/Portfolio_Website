export default function About() {
  return (
    <section id="about" className="py-24 border-t border-[var(--line)]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-medium mb-12 text-[var(--paper)]">
          About
        </h2>
        
        <div className="flex flex-col gap-8 text-lg text-[var(--steel)] leading-relaxed font-light">
          <p>
            I got into web development while studying Computer Science, building small tools to solve immediate problems. That practical approach stuck with me. Now, I focus on building systems that are robust, maintainable, and actually ship.
          </p>
          
          <p>
            I transitioned from freelance work to founding FJ NEXUS, where I specialize in school and business management systems. My work involves taking complex requirements and turning them into straightforward, reliable web applications.
          </p>
          
          <p>
            Right now, I'm actively building in public, refining my engineering process, and taking on select client projects.
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-sm font-mono tracking-widest text-[var(--paper)] uppercase mb-6">
            Core Technologies
          </h3>
          <ul className="flex flex-wrap gap-4 font-mono text-sm">
            <li className="px-3 py-1 bg-[var(--line)] text-[var(--paper)]">React & Next.js</li>
            <li className="px-3 py-1 bg-[var(--line)] text-[var(--paper)]">TypeScript</li>
            <li className="px-3 py-1 bg-[var(--line)] text-[var(--paper)]">Tailwind CSS</li>
            <li className="px-3 py-1 bg-[var(--line)] text-[var(--paper)]">Node.js / Express</li>
            <li className="px-3 py-1 bg-[var(--line)] text-[var(--paper)]">PostgreSQL</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
