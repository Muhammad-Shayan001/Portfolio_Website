import {
  fetchAllGitHubRepos,
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

export interface ProjectDataSet {
  liveProjectCards: ProjectCardData[];
  archiveProjects: ProjectRepo[];
}

const TOPIC_IMAGE_SETS: Array<{ keywords: RegExp; images: string[] }> = [
  {
    keywords: /school|education|student|academy|learning|management/i,
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    keywords: /portfolio|resume|cv|personal website|professional/i,
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    keywords: /store|shop|e-commerce|online store|fashion|gift|products/i,
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    keywords: /hospital|health|medical|clinic|care/i,
    images: [
      "https://images.unsplash.com/photo-1580281657521-41f1344a8be8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580281657521-41f1344a8be8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    keywords: /restaurant|bbq|food|menu|dining/i,
    images: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    keywords: /hackathon|challenge|startup|demo/i,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

const DEFAULT_PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
];

const FEATURED_PROJECTS: ProjectRepo[] = [
  {
    id: 1,
    name: "Portfolio_Website",
    formattedTitle: "Portfolio Website",
    description: "A polished personal portfolio showcasing projects, skills, and professional contact.",
    html_url: "https://github.com/Muhammad-Shayan001/Portfolio_Website",
    homepage: "https://muhammadshayan.me",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 2,
    name: "fj-nexus",
    formattedTitle: "fj nexus",
    description: "A modern business website for showcasing studio services and client work.",
    html_url: "https://github.com/Muhammad-Shayan001/fj-nexus",
    homepage: "https://fjnexus.studio",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 3,
    name: "FJ-Store",
    formattedTitle: "FJ Store",
    description: "A responsive e-commerce storefront built for an online fashion and product store.",
    html_url: "https://github.com/Muhammad-Shayan001/FJ-Store",
    homepage: "https://fjstore.tech",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 4,
    name: "nexus-portfolio",
    formattedTitle: "nexus portfolio",
    description: "A creative portfolio site presenting agency-style design and brand identity.",
    html_url: "https://github.com/Muhammad-Shayan001/nexus-portfolio",
    homepage: "https://nexus-portfolio-theta.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 5,
    name: "CV-2.0",
    formattedTitle: "CV 2.0",
    description: "A clean, modern online CV built for dynamic professional presentation.",
    html_url: "https://github.com/Muhammad-Shayan001/CV-2.0",
    homepage: "https://cv-2-0-three.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 6,
    name: "Resume",
    formattedTitle: "Resume",
    description: "An interactive resume site designed for recruiters and hiring managers.",
    html_url: "https://github.com/Muhammad-Shayan001/Resume",
    homepage: "https://resume-amber-eight.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 7,
    name: "Hospital-Management-Website",
    formattedTitle: "Hospital Management Website",
    description: "A healthcare operations dashboard for patient and appointment management.",
    html_url: "https://github.com/Muhammad-Shayan001/Hospital-Management-Website",
    homepage: "https://hospital-management-website-one.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 8,
    name: "School-Management-App",
    formattedTitle: "School Management App",
    description: "A school administration app for managing students, classes, and schedules.",
    html_url: "https://github.com/Muhammad-Shayan001/School-Management-App",
    homepage: "https://skolic-schools-management-app.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 9,
    name: "School-Management-System",
    formattedTitle: "School Management System",
    description: "A complete school system solution for staff, classes, and student records.",
    html_url: "https://github.com/Muhammad-Shayan001/School-Management-System",
    homepage: "https://school-management-system-ebon-nine.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 10,
    name: "school-management-demo",
    formattedTitle: "School Management Demo",
    description: "A polished demo version of a school operations dashboard with polished UX.",
    html_url: "https://github.com/Muhammad-Shayan001/school-management-demo",
    homepage: "https://school-management-demo-henna.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 11,
    name: "Online_Store",
    formattedTitle: "Online Store",
    description: "An e-commerce storefront for browsing products and placing orders online.",
    html_url: "https://github.com/Muhammad-Shayan001/Online_Store",
    homepage: "https://online-store-neon-beta.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 12,
    name: "Fashion_Store",
    formattedTitle: "Fashion Store",
    description: "A fashion retail website showcasing curated products and collections.",
    html_url: "https://github.com/Muhammad-Shayan001/Fashion_Store",
    homepage: "https://fashion-store-two-navy.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 13,
    name: "Karachi_BBQ",
    formattedTitle: "Karachi BBQ",
    description: "A restaurant landing page for Karachi BBQ with menu and booking details.",
    html_url: "https://github.com/Muhammad-Shayan001/Karachi_BBQ",
    homepage: "https://karachi-bbq.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 14,
    name: "eidi_app",
    formattedTitle: "eidi app",
    description: "A festive greeting app built for sharing Eidi wishes during celebrations.",
    html_url: "https://github.com/Muhammad-Shayan001/eidi_app",
    homepage: "https://eidi-app.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 15,
    name: "Hackathon",
    formattedTitle: "Hackathon",
    description: "A hackathon showcase project built to demonstrate practical web features.",
    html_url: "https://github.com/Muhammad-Shayan001/Hackathon",
    homepage: "https://hackathon-gamma-three-64.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
  {
    id: 16,
    name: "Projects_Journey",
    formattedTitle: "Projects Journey",
    description: "A portfolio journey site documenting web development milestones and learning.",
    html_url: "https://github.com/Muhammad-Shayan001/Projects_Journey",
    homepage: "https://projects-journey.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    isLive: true,
  },
];

function getFeaturedLiveProjects(): ProjectRepo[] {
  return FEATURED_PROJECTS;
}

const UNWANTED_PROJECT_PATTERNS = [/Gift_Web_\d+/i, /^Bithday_Gift$/i];

function getProjectImages(title: string): string[] {
  const normalized = title.toLowerCase();
  const match = TOPIC_IMAGE_SETS.find((topic) => topic.keywords.test(normalized));
  return match ? match.images : DEFAULT_PROJECT_IMAGES;
}

function mapLiveRepoToCard(repo: ProjectRepo): ProjectCardData {
  return {
    id: repo.id,
    name: repo.formattedTitle,
    tagline: repo.homepage ? "Live deployed case study" : "Live project",
    description: repo.description,
    stack: [repo.language ?? "TypeScript"],
    images: getProjectImages(repo.formattedTitle),
    liveUrl: repo.homepage ?? "",
    repoUrl: repo.html_url,
    features: [],
  };
}

function filterOutUnwantedProjects(repos: ProjectRepo[]) {
  return repos.filter((repo) => {
    const title = `${repo.name}`;
    return !UNWANTED_PROJECT_PATTERNS.some((pattern) => pattern.test(title));
  });
}

export async function loadProjectSets(username: string): Promise<ProjectDataSet> {
  try {
    const repos = await fetchAllGitHubRepos(username);
    const { archiveProjects } = splitProjects(repos);
    const filteredArchive = filterOutUnwantedProjects(archiveProjects);

    return {
      liveProjectCards: getFeaturedLiveProjects().map(mapLiveRepoToCard),
      archiveProjects: filteredArchive,
    };
  } catch {
    return {
      liveProjectCards: getFeaturedLiveProjects().map(mapLiveRepoToCard),
      archiveProjects: [],
    };
  }
}

export async function loadLiveProjectCards(username: string): Promise<ProjectCardData[]> {
  const { liveProjectCards } = await loadProjectSets(username);
  return liveProjectCards;
}
