import { NextResponse } from "next/server";
import {
  fetchAllGitHubRepos,
  filterExcludedRepos,
  type ProjectRepo,
} from "@/components/githubProjects";

// Cache the response at the Next.js data cache layer for an hour so the
// marquee's client fetch hits a hot endpoint instead of GitHub on every page
// view. GitHub's unauthenticated rate limit is 60 req/h/IP — this stays
// comfortably under that ceiling.
export const revalidate = 3600;
// Always run on the Node.js runtime so we can use Node's `fetch` with
// AbortSignal timeout semantics and avoid the Edge runtime's smaller heap.
export const runtime = "nodejs";
// Network access happens at request time, never at build time, which keeps
// the Webpack build worker free of the GitHub payload.
export const dynamic = "force-dynamic";

const MAX_PAGES = 3;
const PER_PAGE = 100;
const FETCH_TIMEOUT_MS = 8000;

export async function GET(): Promise<NextResponse<ProjectRepo[] | { error: string }>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const repos = await fetchAllGitHubRepos("Muhammad-Shayan001", {
      maxPages: MAX_PAGES,
      perPage: PER_PAGE,
      signal: controller.signal,
    });
    const filtered = filterExcludedRepos(repos);
    return NextResponse.json(filtered, {
      headers: {
        // The marquee polls occasionally; let the browser keep a short copy.
        "Cache-Control": "public, max-age=300, s-maxage=3600",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown GitHub fetch error";
    return NextResponse.json({ error: message }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}