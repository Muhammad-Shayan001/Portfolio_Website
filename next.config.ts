import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Source maps are useful for debugging but materially grow the in-memory
  // module graph during builds. The portfolio site ships as static HTML, so
  // disabling production source maps trims a significant amount of heap
  // pressure on the Webpack build worker.
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
    // Reduces Webpack's max in-memory footprint during compilation at the
    // cost of slightly longer build times. This is the documented, supported
    // lever for "JS heap out of memory" build-worker crashes.
    webpackMemoryOptimizations: true,
    // Keep prerender concurrency low so the Webpack worker isn't asked to
    // compile several large pages in parallel — that's exactly the case that
    // blew the heap when GitHub data was being fetched at build time.
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 1,
  },
};

export default nextConfig;