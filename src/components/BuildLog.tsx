"use client";

interface LogEntry {
  date: string;
  note: string;
}

const buildLogs: LogEntry[] = [
  {
    date: "August 2026",
    note: "Rebuilding personal portfolio site to reflect actual engineering practices.",
  },
  {
    date: "July 2026",
    note: "Building Skolic's fee module - optimizing complex relational queries in Postgres.",
  },
  {
    date: "June 2026",
    note: "Shipped FJ Nexus brand system and initial client dashboard.",
  },
  {
    date: "May 2026",
    note: "Working on the Freelancer Suite architecture, transitioning to Next.js App Router.",
  }
];

export default function BuildLog() {
  return (
    <div className="hidden xl:flex flex-col w-64 fixed right-8 top-32 bottom-8 z-10 border-l border-[var(--line)] pl-6 overflow-y-auto scrollbar-hide text-sm">
      <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--paper)] mb-8">
        Build Log
      </h3>
      
      <div className="flex flex-col gap-8 relative before:absolute before:left-[-25px] before:top-2 before:bottom-0 before:w-px before:bg-[var(--line)]">
        {buildLogs.map((log, index) => (
          <div key={index} className="relative">
            {/* Timeline dot */}
            <div className="absolute left-[-29px] top-1.5 w-2 h-2 bg-[var(--steel)] rounded-full border-2 border-[var(--ink)]"></div>
            
            <time className="block text-[var(--signal)] font-mono text-xs mb-1">
              {log.date}
            </time>
            <p className="text-[var(--steel)] leading-relaxed">
              {log.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
