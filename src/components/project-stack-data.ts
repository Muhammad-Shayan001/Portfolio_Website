import {
  getFallbackLiveProjects,
  splitProjects,
  type ProjectRepo,
} from "./githubProjects";

export interface ProjectCardData {
  id: number;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  images: string[];
  liveUrl: string;
  repoUrl: string;
  features: string[];
}

// Images are embedded per-project to avoid generic/fake image assignment.
const FEATURED_PROJECTS: ProjectCardData[] = [
  {
    id: 1,
    name: "Portfolio Website",
    tagline: "Live deployed case study",
    description: "A polished personal portfolio showcasing projects, skills, and professional contact.",
    stack: ["TypeScript"],
    images: ["/project-screenshots/id01.jpg"],
    liveUrl: "https://muhammadshayan.me",
    repoUrl: "https://github.com/Muhammad-Shayan001/Portfolio_Website",
    features: [],
  },
  {
    id: 2,
    name: "fj nexus",
    tagline: "Live deployed case study",
    description: "A modern business website for showcasing studio services and client work.",
    stack: ["TypeScript"],
    images: ["/id02.jpg"],
    liveUrl: "https://fjnexus.studio",
    repoUrl: "https://github.com/Muhammad-Shayan001/fj-nexus",
    features: [],
    
  },
  {
    id: 3,
    name: "FJ Store",
    tagline: "Live deployed case study",
    description: "A responsive e-commerce storefront built for an online fashion and product store.",
    stack: ["TypeScript"],
    images: ["/project-screenshots/id03.jpg"],
    liveUrl: "https://fjstore.tech",
    repoUrl: "https://github.com/Muhammad-Shayan001/FJ-Store",
    features: [],
  },
  {
    id: 4,
    name: "School Management System",
    tagline: "Live deployed case study",
    description: "A complete school system solution for staff, classes, and student records.",
    stack: ["TypeScript"],
    images: ["/project-screenshots/id04.jpg"],
    liveUrl: "https://school-management-system-ebon-nine.vercel.app",
    repoUrl: "https://github.com/Muhammad-Shayan001/School-Management-System",
    features: [],
  },
  {
    id: 5,
    name: "Hospital Management Website",
    tagline: "Live deployed case study",
    description: "A healthcare operations dashboard for patient and appointment management.",
    stack: ["TypeScript"],
    images: ["/project-screenshots/id05.jpg"],
    liveUrl: "https://hospital-management-website-one.vercel.app",
    repoUrl: "https://github.com/Muhammad-Shayan001/Hospital-Management-Website",
    features: [],
  },
  {
    id: 6,
    name: "School Management App",
    tagline: "Live deployed case study",
    description: "A school administration app for managing students, classes, and schedules.",
    stack: ["TypeScript"],
    images: ["/project-screenshots/id06.jpg"],
    liveUrl: "https://skolic-schools-management-app.vercel.app",
    repoUrl: "https://github.com/Muhammad-Shayan001/School-Management-App",
    features: [],
  },
  {
    id: 7,
    name: "Online Store",
    tagline: "Live deployed case study",
    description: "An e-commerce storefront for browsing products and placing orders online.",
    stack: ["TypeScript"],
    images: ["/project-screenshots/id07.jpg"],
    liveUrl: "https://online-store-neon-beta.vercel.app",
    repoUrl: "https://github.com/Muhammad-Shayan001/Online_Store",
    features: [],
  },
  {
    id: 8,
    name: "Fashion Store",
    tagline: "Live deployed case study",
    description: "A fashion retail website showcasing curated products and collections.",
    stack: ["TypeScript"],
    images: ["/project-screenshots/id08.jpg"],
    liveUrl: "https://fashion-store-two-navy.vercel.app",
    repoUrl: "https://github.com/Muhammad-Shayan001/Fashion_Store",
    features: [],
  },
  {
    id: 9,
    name: "Karachi BBQ",
    tagline: "Live deployed case study",
    description: "A restaurant landing page for Karachi BBQ with menu and booking details.",
    stack: ["TypeScript"],
    images: ["/project-screenshots/id09.jpg"],
    liveUrl: "https://karachi-bbq.vercel.app",
    repoUrl: "https://github.com/Muhammad-Shayan001/Karachi_BBQ",
    features: [],
  },
  {
    id: 10,
    name: "School Management Demo",
    tagline: "Live deployed case study",
    description: "A polished demo version of a school operations dashboard with polished UX.",
    stack: ["TypeScript"],
    images: ["/project-screenshots/id10.jpg"],
    liveUrl: "https://school-management-demo-henna.vercel.app",
    repoUrl: "https://github.com/Muhammad-Shayan001/school-management-demo",
    features: [],
  },
];

export function getFeaturedLiveProjects(): ProjectCardData[] {
  return FEATURED_PROJECTS;
}

const UNWANTED_PROJECT_PATTERNS = [/Gift_Web_\d+/i, /^Bithday_Gift$/i];

export function filterArchiveProjects(repos: ProjectRepo[]): ProjectRepo[] {
  return repos.filter((repo) => {
    const title = `${repo.name}`;
    return !UNWANTED_PROJECT_PATTERNS.some((pattern) => pattern.test(title));
  });

  
}
