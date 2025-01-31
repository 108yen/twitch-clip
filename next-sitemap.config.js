/** @type {import('next-sitemap').IConfig} */
module.exports = {
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        disallow: ["/about", "/release-note", "/favorite", "/install-manual"],
        userAgent: "*",
      },
      ...[
        "bingbot",
        "MJ12bot",
        "AhrefsBot",
        "BLEXBot",
        "Yandex",
        "baiduspider",
        "SemrushBot",
      ].map((value) => ({ disallow: ["/streamer/"], userAgent: value })),
    ],
  },
  siteUrl: "https://www.twitchclipsranking.com/",
}
