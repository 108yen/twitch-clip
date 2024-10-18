module.exports = {
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        disallow: ["/about"],
        userAgent: "*",
      },
    ],
  },
  siteUrl: "https://www.twitchclipsranking.com/",
}
