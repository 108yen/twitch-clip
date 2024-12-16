module.exports = {
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        disallow: ["/about", "/release-note", "/favorite"],
        userAgent: "*",
      },
    ],
  },
  siteUrl: "https://www.twitchclipsranking.com/",
}
