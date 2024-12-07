import { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheMaxMemorySize: 1572864000, // 1.5G = 1500 * 1024 * 1024
  eslint: {
    //NOTE: use biome
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["clips-media-assets2.twitch.tv"],
  },
  reactStrictMode: true,
}

export default nextConfig
