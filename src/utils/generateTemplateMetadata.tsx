import { Metadata } from 'next'

export default function generateTemplateMetadata(props?: {
    caption?: string
    discription?: string
}) {
    const caption = props?.caption
    const title = caption
        ? `Twitchクリップランキング | ${caption}`
        : `Twitchクリップランキング`
    const description = caption
        ? `${caption}のTwitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。`
        : `Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。`

    const metadata: Metadata = {
        metadataBase: new URL(process.env.URL!),
        title: title,
        description: props?.discription ?? description,
        openGraph: {
            type: `website`,
            title: title,
            description: props?.discription ?? description,
            siteName: `Twitch clip ranking`,
            url: process.env.URL!,
            images: [
                {
                    url: `${process.env.URL!}/android-chrome-512x512.png`,
                    type: `image/png`
                }
            ]
        },
        twitter: {
            card: `summary`
        }
    }

    return metadata
}
