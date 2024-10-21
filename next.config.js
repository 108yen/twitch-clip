/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheMaxMemorySize: 1500 * 1024 * 1024, // 1.5G
  experimental: {
    urlImports:["https://player.twitch.tv/js/embed/v1.js"]
  },
  images: {
    domains: ["clips-media-assets2.twitch.tv"],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
