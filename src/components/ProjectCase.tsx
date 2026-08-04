"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCaseProps {
  title: string;
  problem: string;
  approach: string;
  hardPart: string;
  result: string;
  liveUrl?: string;
  imagePath: string;
  reverse?: boolean;
}

export default function ProjectCase({
  title,
  problem,
  approach,
  hardPart,
  result,
  liveUrl,
  imagePath,
  reverse = false,
}: ProjectCaseProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col gap-12 py-20 border-t border-[var(--line)] ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      {/* Text Side */}
      <div className="flex-1 flex flex-col justify-center gap-8">
        <h3 className="text-3xl md:text-4xl font-medium text-[var(--paper)]">
          {title}
        </h3>
        
        <div className="flex flex-col gap-6 text-[var(--steel)] font-light leading-relaxed">
          <div>
            <strong className="block text-[var(--paper)] font-mono text-xs uppercase tracking-widest mb-2">The Problem</strong>
            <p>{problem}</p>
          </div>
          
          <div>
            <strong className="block text-[var(--paper)] font-mono text-xs uppercase tracking-widest mb-2">The Approach</strong>
            <p>{approach}</p>
          </div>
          
          <div>
            <strong className="block text-[var(--paper)] font-mono text-xs uppercase tracking-widest mb-2">What Was Hard</strong>
            <p>{hardPart}</p>
          </div>
          
          <div>
            <strong className="block text-[var(--paper)] font-mono text-xs uppercase tracking-widest mb-2">The Result</strong>
            <p>{result}</p>
          </div>
        </div>

        {liveUrl && (
          <div className="mt-4">
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--signal)] hover:text-opacity-80 transition-colors font-medium"
            >
              View Live Site
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Image Side */}
      <div className="flex-1 h-[400px] md:h-auto relative bg-[var(--line)] border border-[var(--steel)] flex items-center justify-center text-[var(--steel)] text-sm overflow-hidden">
        <span className="font-mono z-10 px-4 text-center">Add actual screenshot to public/images/{imagePath}</span>
        <Image 
          src={`/images/${imagePath}`}
          alt={`Screenshot of ${title}`}
          fill
          className="object-cover object-top"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    </motion.div>
  );
}
