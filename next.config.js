/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheMaxMemorySize: 1500 * 1024 * 1024, // 1.5G
  eslint: {
    //NOTE: use biome
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["clips-media-assets2.twitch.tv"],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
