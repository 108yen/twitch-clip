/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["clips-media-assets2.twitch.tv"]
  },
  eslint: {
    //NOTE: use biome
    ignoreDuringBuilds: true
  },
  cacheMaxMemorySize: 1024
}

module.exports = nextConfig
