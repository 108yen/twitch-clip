/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["clips-media-assets2.twitch.tv"],
  },
  eslint: {
    //NOTE: use biome
    ignoreDuringBuilds: true,
  },
  cacheMaxMemorySize: 1500 * 1024 * 1024, // 1.5G
}

module.exports = nextConfig
