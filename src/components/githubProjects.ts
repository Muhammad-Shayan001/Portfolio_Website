export interface GitHubRepoResponse {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

export interface ProjectRepo {
  id: number;
  name: string;
  formattedTitle: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  isLive: boolean;
}

const FALLBACK_LIVE_PROJECTS: ProjectRepo[] = [
  {
    id: 1323327013,
    name: "School Management App",
    formattedTitle: "School Management App",
    description: "This is the school management app for mantiaining the school by app or website",
    html_url: "https://github.com/Muhammad-Shayan001/School-Management-App",
    homepage: "https://skolic-schools-management-app.vercel.app/",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327014,
    name: "Portfolio Website",
    formattedTitle: "Portfolio Website",
    description: "This is my proffesional Potfolio Website",
    html_url: "https://github.com/Muhammad-Shayan001/Portfolio_Website",
    homepage: "https://muhammadshayan.me",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327015,
    name: "fj nexus",
    formattedTitle: "fj nexus",
    description: "This is my buisness webiste in which we offer the some services",
    html_url: "https://github.com/Muhammad-Shayan001/fj-nexus",
    homepage: "https://fjnexus.studio",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327016,
    name: "FJ Store",
    formattedTitle: "FJ Store",
    description: "This is my online Store.",
    html_url: "https://github.com/Muhammad-Shayan001/FJ-Store",
    homepage: "https://fjstore.tech",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327017,
    name: "School Management Demo",
    formattedTitle: "School Management Demo",
    description: "This is the demo project for managing the schooling system fully detailed",
    html_url: "https://github.com/Muhammad-Shayan001/school-management-demo",
    homepage: "https://school-management-demo-henna.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327018,
    name: "Resume",
    formattedTitle: "Resume",
    description: "This is my Updated CV",
    html_url: "https://github.com/Muhammad-Shayan001/Resume",
    homepage: "https://resume-amber-eight.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327019,
    name: "School Management System",
    formattedTitle: "School Management System",
    description: "This is the demo which i created for managing the schooling system",
    html_url: "https://github.com/Muhammad-Shayan001/School-Management-System",
    homepage: "https://school-management-system-ebon-nine.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327020,
    name: "Hospital Management Website",
    formattedTitle: "Hospital Management Website",
    description: "This is the web base hospital management app in which i used java as a backend this is my uni final project.",
    html_url: "https://github.com/Muhammad-Shayan001/Hospital-Management-Website",
    homepage: "https://hospital-management-website-one.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327021,
    name: "Online Store",
    formattedTitle: "Online Store",
    description: "Online Store is an e-commerce website where users can browse products and easily place orders online. The platform provides a simple, clean, and user-friendly shopping experience with affordable and reasonable prices. Customers can explore product details, select items, and complete checkout quickly through the website.",
    html_url: "https://github.com/Muhammad-Shayan001/Online_Store",
    homepage: "https://online-store-neon-beta.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327022,
    name: "nexus portfolio",
    formattedTitle: "nexus portfolio",
    description: "This is the potfolio webiste.",
    html_url: "https://github.com/Muhammad-Shayan001/nexus-portfolio",
    homepage: "https://nexus-portfolio-theta.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327023,
    name: "Karachi BBQ",
    formattedTitle: "Karachi BBQ",
    description: "This is the webiste for the resturent of BBQ",
    html_url: "https://github.com/Muhammad-Shayan001/Karachi_BBQ",
    homepage: "https://karachi-bbq.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327024,
    name: "Fashion Store",
    formattedTitle: "Fashion Store",
    description: "This is the Store in which thw Fashion realted items are present",
    html_url: "https://github.com/Muhammad-Shayan001/Fashion_Store",
    homepage: "https://fashion-store-two-navy.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327026,
    name: "CV-2.0",
    formattedTitle: "CV 2.0",
    description: "This is my Updated CV",
    html_url: "https://github.com/Muhammad-Shayan001/CV-2.0",
    homepage: "https://cv-2-0-three.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327027,
    name: "eidi app",
    formattedTitle: "eidi app",
    description: "This is the eidi wish website \"EID MUBARAK\"",
    html_url: "https://github.com/Muhammad-Shayan001/eidi_app",
    homepage: "https://eidi-app.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327028,
    name: "Hackathon",
    formattedTitle: "Hackathon",
    description: "This is my Hackathon Project",
    html_url: "https://github.com/Muhammad-Shayan001/Hackathon",
    homepage: "https://hackathon-gamma-three-64.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 1323327030,
    name: "Projects Journey",
    formattedTitle: "Projects Journey",
    description: "This is my web_Development Study Journey In this Repo, how my journey was my development Journey  is take place. In this journey I learned about the concept of web developing like HTML, Java Script, CSS, React, Tailwind, Node JS , Express JS, MangoDB, etc",
    html_url: "https://github.com/Muhammad-Shayan001/Projects_Journey",
    homepage: "https://projects-journey.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
];

function isValidHomepage(homepage: string | null): homepage is string {
  if (!homepage || !homepage.trim()) return false;

  try {
    const url = new URL(homepage);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function normalizeRepo(repo: GitHubRepoResponse): ProjectRepo {
  const validHomepage = isValidHomepage(repo.homepage);

  return {
    id: repo.id,
    name: repo.name,
    formattedTitle: repo.name.replace(/[-_]/g, " "),
    description: repo.description || "Full-stack web application built with modern architecture.",
    html_url: repo.html_url,
    homepage: validHomepage ? repo.homepage : null,
    language: repo.language || "TypeScript",
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    fork: repo.fork,
    isLive: validHomepage,
  };
}

export function splitProjects(repos: ProjectRepo[]) {
  const liveProjects = repos.filter((repo) => repo.isLive);
  const archiveProjects = repos.filter((repo) => !repo.isLive);
  return { liveProjects, archiveProjects };
}

export async function fetchAllGitHubRepos(username: string): Promise<ProjectRepo[]> {
  const allRepos: ProjectRepo[] = [];
  let page = 1;

  while (page <= 10) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error on page ${page}`);
    }

    const batch = (await response.json()) as GitHubRepoResponse[];

    if (!Array.isArray(batch) || batch.length === 0) {
      break;
    }

    allRepos.push(...batch.map(normalizeRepo));

    if (batch.length < 100) {
      break;
    }

    page += 1;
  }

  return allRepos;
}

export function getFallbackLiveProjects(): ProjectRepo[] {
  return FALLBACK_LIVE_PROJECTS;
}
