import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectCase from "@/components/ProjectCase";
import BuildLog from "@/components/BuildLog";

export default function Home() {
  return (
    <main className="relative bg-[var(--ink)] min-h-screen">
      {/* Subtle background noise texture */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <BuildLog />

      <div className="xl:mr-72 relative z-10">
        <Hero />
        
        <About />

        {/* Real Projects Section */}
        <section id="projects" className="py-24 border-t border-[var(--line)]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-medium mb-16 text-[var(--paper)]">
              Featured Projects
            </h2>
            
            <div className="flex flex-col">
              <ProjectCase
                title="School Management System"
                problem="Schools need an integrated backend to handle administrative workflows, student records, teacher allocations, and class scheduling without data mismatch."
                approach="Architected a comprehensive RESTful backend application using Node.js, Express, and MongoDB to manage multi-role authentication and data integrity."
                hardPart="Designing a flexible MongoDB schema to represent complex relationships between students, classes, subjects, and grading systems."
                result="A production-grade backend solution open-sourced on GitHub with clean controllers, middleware, and documentation."
                imagePath="skolic-dashboard.png"
                liveUrl="https://github.com/muhammadshayan001/school-management-system"
                reverse={false}
              />
              
              <ProjectCase
                title="Full-Stack E-Commerce Platform"
                problem="Modern online shoppers require fast page loads, real-time cart persistence, secure payment processing, and intuitive checkout flows."
                approach="Built a full-stack e-commerce web application featuring Next.js, React, Node.js, and MongoDB with integrated Stripe payment processing."
                hardPart="Ensuring real-time state synchronization between front-end shopping cart components and backend inventory databases."
                result="Deployed project demonstrating end-to-end shopping workflow from catalog browsing to payment verification."
                imagePath="freelancer-suite.png"
                liveUrl="https://drive.google.com/file/d/1T7IoJa66f_dW5s6iiZGGWGm3IB4NUweZ/view?usp=drive_link"
                reverse={true}
              />

              <ProjectCase
                title="Restaurant Web Application & Booking UI"
                problem="Restaurants need an attractive digital storefront that showcases their culinary menu while offering customers an easy online booking interface."
                approach="Developed a responsive web application built with React and Tailwind CSS featuring dynamic menu items and table reservation UI."
                hardPart="Crafting pixel-perfect responsive layouts that deliver seamless user experience across mobile, tablet, and desktop viewports."
                result="Published web demo hosted on Netlify, receiving positive user feedback for crisp visual design."
                imagePath="fjnexus-platform.png"
                liveUrl="https://drive.google.com/file/d/1QN7xIrpRTnZpaptaXDAQAK5olipr0b06/view?usp=drive_link"
                reverse={false}
              />
            </div>
          </div>
        </section>

        {/* Certifications & Volunteer Highlights */}
        <section id="certifications" className="py-24 border-t border-[var(--line)] bg-[var(--line)]/20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-medium mb-12 text-[var(--paper)]">
              Certifications & Community Impact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Kaggle 17 Certs Box */}
              <div className="p-8 bg-[var(--line)] border border-[var(--steel)]/30 flex flex-col justify-between">
                <div>
                  <span className="text-[var(--signal)] font-mono text-xs uppercase tracking-widest block mb-2">17 Course Certificates</span>
                  <h3 className="text-2xl font-medium text-[var(--paper)] mb-4">Kaggle AI & Data Science Mastery</h3>
                  <p className="text-[var(--steel)] text-sm leading-relaxed mb-6 font-light">
                    Completed 17 comprehensive Kaggle certifications spanning Python programming, Machine Learning, Deep Learning, Computer Vision, Natural Language Processing (NLP), Pandas, Data Visualization, and SQL.
                  </p>
                </div>
                <a 
                  href="https://drive.google.com/file/d/1jnnItxeZ08YMamkRjWKgTCQm3zXhfUbh/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--signal)] hover:text-opacity-80 transition-colors text-sm font-mono"
                >
                  View All 17 Certificates (Google Drive) →
                </a>
              </div>

              {/* Saylani Volunteer Box */}
              <div className="p-8 bg-[var(--line)] border border-[var(--steel)]/30 flex flex-col justify-between">
                <div>
                  <span className="text-[var(--signal)] font-mono text-xs uppercase tracking-widest block mb-2">Saylani Welfare International</span>
                  <h3 className="text-2xl font-medium text-[var(--paper)] mb-4">SMIT Official Volunteer & Hackathons</h3>
                  <p className="text-[var(--steel)] text-sm leading-relaxed mb-6 font-light">
                    Recognized as an official volunteer by Saylani Welfare for contributing to community IT initiatives. Active participant in the 12-Month SMIT Hackathon and Coding Night at Zaitoon Ashraf IT Park.
                  </p>
                </div>
                <a 
                  href="https://drive.google.com/file/d/15VvP0E64HRd8stXG1mL6fNq8-Mcq7mWp/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--signal)] hover:text-opacity-80 transition-colors text-sm font-mono"
                >
                  View Official Volunteer Certificate →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 border-t border-[var(--line)]">
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-medium mb-8 text-[var(--paper)]">
              Let's Connect & Work Together
            </h2>
            <p className="text-xl text-[var(--steel)] max-w-2xl mb-12 font-light">
              I am open to full-stack engineering opportunities, web development projects, and technical collaborations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="mailto:shayan.javed091@gmail.com" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--paper)] text-[var(--ink)] font-medium hover:bg-opacity-90 transition-colors text-lg"
              >
                shayan.javed091@gmail.com
              </a>
              <a 
                href="https://github.com/Muhammad-Shayan001" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-[var(--steel)] text-[var(--paper)] font-medium hover:border-[var(--paper)] transition-colors text-lg"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </section>
        
        <footer className="py-8 text-center text-[var(--steel)] text-sm border-t border-[var(--line)] mt-12">
          <p>© {new Date().getFullYear()} Muhammad Shayan. Karachi, Pakistan.</p>
        </footer>
      </div>
    </main>
  );
}
