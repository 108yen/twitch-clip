module.exports = {
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        disallow: ["/about", "/release-note", "/favorite", "/install-manual"],
        userAgent: "*",
      },
      {
        disallow: ["/streamer/"],
        userAgent: "bingbot",
      },
    ],
  },
  siteUrl: "https://www.twitchclipsranking.com/",
}
