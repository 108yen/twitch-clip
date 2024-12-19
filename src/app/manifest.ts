import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#fff",
    description:
      "Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。",
    display: "standalone",
    icons: [
      {
        sizes: "256x256",
        src: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        sizes: "192x192",
        src: "/android-chrome-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/android-chrome-512x512.png",
        type: "image/png",
      },
    ],
    name: "Twitch Clip Ranking",
    short_name: "Twitch Clip Ranking",
    start_url: "/",
    theme_color: "#000",
  }
}
