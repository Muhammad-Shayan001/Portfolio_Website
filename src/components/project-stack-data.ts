import {
  fetchAllGitHubRepos,
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

export async function loadProjectSets(username: string): Promise<ProjectDataSet> {
  try {
    const repos = await fetchAllGitHubRepos(username);
    const { liveProjects, archiveProjects } = splitProjects(repos);

    const liveProjectCards = liveProjects.length > 0
      ? liveProjects.map(mapLiveRepoToCard)
      : getFallbackLiveProjects().map(mapLiveRepoToCard);

    return { liveProjectCards, archiveProjects };
  } catch {
    return {
      liveProjectCards: getFallbackLiveProjects().map(mapLiveRepoToCard),
      archiveProjects: [],
    };
  }
}

export async function loadLiveProjectCards(username: string): Promise<ProjectCardData[]> {
  const { liveProjectCards } = await loadProjectSets(username);
  return liveProjectCards;
}
