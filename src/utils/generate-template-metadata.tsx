import { Metadata } from "next"

export default function generateTemplateMetadata(props?: {
  caption?: string
  description?: string
}) {
  const caption = props?.caption
  const title = caption
    ? `${caption} | Twitchクリップランキング`
    : "Twitchクリップランキング"
  const description = caption
    ? `${caption}のTwitch(ツイッチ)クリップの再生数ランキング。`
    : "Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。"

  const metadata: Metadata = {
    description: props?.description ?? description,
    metadataBase: new URL(process.env.URL!),
    openGraph: {
      description: props?.description ?? description,
      images: [
        {
          type: "image/png",
          url: `${process.env.URL!}/android-chrome-512x512.png`,
        },
      ],
      siteName: "Twitch clip ranking",
      title: title,
      type: "website",
      url: process.env.URL!,
    },
    title: title,
    twitter: {
      card: "summary",
    },
  }

  return metadata
}
