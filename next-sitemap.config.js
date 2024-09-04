module.exports = {
    siteUrl: "https://www.twitchclipsranking.com/",
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: ["/about","/streamer/*"],
            },
        ],
    },
}
