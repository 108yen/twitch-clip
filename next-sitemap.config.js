module.exports = {
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        disallow: ["/about", "/release-note"],
        userAgent: "*",
      },
    ],
  },
  siteUrl: "https://www.twitchclipsranking.com/",
}
