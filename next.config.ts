import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Full Next.js with API routes support
  // Deploy to Vercel or Cloudflare Pages for complete functionality
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
