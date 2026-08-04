import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectCase from "@/components/ProjectCase";
import BuildLog from "@/components/BuildLog";

export default function Home() {
  return (
    <main className="relative bg-[var(--ink)] min-h-screen">
      {/* Background grain texture for that premium dark look (optional, subtle) */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <BuildLog />

      <div className="xl:mr-72 relative z-10">
        <Hero />
        
        <About />

        <section id="projects" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-medium mb-16 text-[var(--paper)]">
              Selected Work
            </h2>
            
            <div className="flex flex-col">
              <ProjectCase
                title="Skolic"
                problem="Schools often rely on fragmented, outdated systems to manage fees, attendance, and grading, leading to administrative overhead and lost data."
                approach="Built a unified school management system with a focus on a highly resilient, transaction-safe fee module using Next.js and PostgreSQL."
                hardPart="Optimizing complex relational queries for the fee calculation engine to ensure sub-second response times even for large schools with thousands of students."
                result="Currently in beta testing with select local schools, demonstrating a 40% reduction in administrative time spent on fee reconciliation."
                imagePath="skolic-dashboard.png"
                liveUrl="https://skolic.com" // Update with real URL
                reverse={false}
              />
              
              <ProjectCase
                title="FJ NEXUS Platform"
                problem="Small to medium businesses lack a cohesive digital presence and internal tools, often stringing together multiple SaaS products."
                approach="Developed a centralized client portal and modular business system offering bespoke solutions from CRM to inventory management."
                hardPart="Designing a modular architecture that allows turning features on and off per client tenant without bloating the core application state."
                result="Successfully onboarded initial agency clients, providing them with a single pane of glass for their business operations."
                imagePath="fjnexus-platform.png"
                liveUrl="https://fjnexus.com" // Update with real URL
                reverse={true}
              />

              <ProjectCase
                title="Freelancer Suite"
                problem="Freelancers struggle with context switching between different apps for invoicing, project tracking, and client communication."
                approach="Created an all-in-one dashboard tailored for independent developers to manage their entire workflow in one place."
                hardPart="Implementing real-time updates and seamless state synchronization across the dashboard using React context and optimistic UI updates."
                result="A personal internal tool that I use daily to manage my freelance pipeline, saving me approximately 5 hours of admin work per week."
                imagePath="freelancer-suite.png"
                // liveUrl="#" // No duplicate link
                reverse={false}
              />
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 border-t border-[var(--line)]">
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-medium mb-8 text-[var(--paper)]">
              Let's Build Something
            </h2>
            <p className="text-xl text-[var(--steel)] max-w-2xl mb-12 font-light">
              Whether you need a full-stack application built from scratch or a technical partner for your business, I'm currently taking on select projects.
            </p>
            <a 
              href="mailto:hello@muhammadshayan.me" 
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--paper)] text-[var(--ink)] font-medium hover:bg-opacity-90 transition-colors text-lg"
            >
              hello@muhammadshayan.me
            </a>
          </div>
        </section>
        
        <footer className="py-8 text-center text-[var(--steel)] text-sm border-t border-[var(--line)] mt-12">
          <p>© {new Date().getFullYear()} Muhammad Shayan. Built with intent.</p>
        </footer>
      </div>
    </main>
  );
}
