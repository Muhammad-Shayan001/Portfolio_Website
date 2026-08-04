export default function About() {
  return (
    <section id="about" className="py-24 border-t border-[var(--line)]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-medium mb-12 text-[var(--paper)]">
          About Me
        </h2>
        
        <div className="flex flex-col gap-8 text-lg text-[var(--steel)] leading-relaxed font-light">
          <p>
            Dedicated Full-Stack Developer and aspiring Educator with a strong academic foundation in Software Engineering and Islamic studies (Dars-e-Nizami). I build responsive, production-ready web applications using React, Next.js, Node.js, and MongoDB.
          </p>
          
          <p>
            I hold <strong className="text-[var(--paper)] font-normal">17 Kaggle Course Certifications</strong> across Python, Machine Learning, Deep Learning, SQL, Computer Vision, and Data Science. I am committed to continuous learning, knowledge-sharing, and solving real-world problems through robust technology.
          </p>
        </div>

        {/* Education & Background */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 pt-12 border-t border-[var(--line)]">
          <div>
            <h3 className="text-sm font-mono tracking-widest text-[var(--paper)] uppercase mb-4">
              Education & Academic Track
            </h3>
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-[var(--line)] border-l-2 border-[var(--signal)]">
                <strong className="block text-[var(--paper)] text-base">Software Engineering</strong>
                <span className="text-xs text-[var(--steel)] font-mono">Academic CS Foundation & Full-Stack Web Development</span>
              </div>
              <div className="p-4 bg-[var(--line)] border-l-2 border-[var(--signal)]">
                <strong className="block text-[var(--paper)] text-base">Dars-e-Nizami</strong>
                <span className="text-xs text-[var(--steel)] font-mono">Islamic Studies Academic Degree</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono tracking-widest text-[var(--paper)] uppercase mb-4">
              Certifications & Events
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-[var(--steel)] font-mono">
              <li className="flex items-start gap-2">
                <span className="text-[var(--signal)]">✓</span>
                <span><strong className="text-[var(--paper)]">SMIT Web Development</strong> — Saylani Mass IT Training</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--signal)]">✓</span>
                <span><strong className="text-[var(--paper)]">17 Kaggle Certificates</strong> — ML, AI, Python, SQL & Data Science</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--signal)]">✓</span>
                <span><strong className="text-[var(--paper)]">SMIT Volunteer</strong> — Official Community IT Volunteer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--signal)]">✓</span>
                <span><strong className="text-[var(--paper)]">Coding Night</strong> — Zaitoon Ashraf IT Park Marathon</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <div className="mt-16 pt-12 border-t border-[var(--line)]">
          <h3 className="text-sm font-mono tracking-widest text-[var(--paper)] uppercase mb-8">
            Technical Stack & Capabilities
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[var(--line)]">
              <h4 className="font-mono text-xs text-[var(--signal)] uppercase tracking-wider mb-3">Frontend</h4>
              <ul className="flex flex-wrap gap-2 font-mono text-xs text-[var(--paper)]">
                <li className="px-2 py-1 bg-[var(--ink)]">React</li>
                <li className="px-2 py-1 bg-[var(--ink)]">Next.js</li>
                <li className="px-2 py-1 bg-[var(--ink)]">TypeScript</li>
                <li className="px-2 py-1 bg-[var(--ink)]">Tailwind CSS</li>
                <li className="px-2 py-1 bg-[var(--ink)]">JavaScript</li>
              </ul>
            </div>

            <div className="p-5 bg-[var(--line)]">
              <h4 className="font-mono text-xs text-[var(--signal)] uppercase tracking-wider mb-3">Backend & DB</h4>
              <ul className="flex flex-wrap gap-2 font-mono text-xs text-[var(--paper)]">
                <li className="px-2 py-1 bg-[var(--ink)]">Node.js</li>
                <li className="px-2 py-1 bg-[var(--ink)]">Express</li>
                <li className="px-2 py-1 bg-[var(--ink)]">MongoDB</li>
                <li className="px-2 py-1 bg-[var(--ink)]">PostgreSQL / SQL</li>
                <li className="px-2 py-1 bg-[var(--ink)]">REST APIs</li>
              </ul>
            </div>

            <div className="p-5 bg-[var(--line)]">
              <h4 className="font-mono text-xs text-[var(--signal)] uppercase tracking-wider mb-3">AI & DevOps</h4>
              <ul className="flex flex-wrap gap-2 font-mono text-xs text-[var(--paper)]">
                <li className="px-2 py-1 bg-[var(--ink)]">Machine Learning</li>
                <li className="px-2 py-1 bg-[var(--ink)]">Deep Learning</li>
                <li className="px-2 py-1 bg-[var(--ink)]">Docker</li>
                <li className="px-2 py-1 bg-[var(--ink)]">Git & GitHub</li>
                <li className="px-2 py-1 bg-[var(--ink)]">Vercel & Render</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
