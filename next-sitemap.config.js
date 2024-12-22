module.exports = {
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        disallow: ["/about", "/release-note", "/favorite", "/install-manual"],
        userAgent: "*",
      },
    ],
  },
  siteUrl: "https://www.twitchclipsranking.com/",
}
