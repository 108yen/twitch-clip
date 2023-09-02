import { ReactNode } from 'react'
import { Providers } from '@/components/providers';

export const metadata = {
    title: {
        default:'Twitchクリップランキング',
        template: 'Twitchクリップランキング | %s',
    },
    description: 'Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。',
    openGraph: {
        type: 'website',
        title: {
            default: 'Twitchクリップランキング',
            template: 'Twitchクリップランキング | %s',
        },
        description: {
            default:'Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。',
            template:'%sのTwitch(ツイッチ)クリップの再生数ランキング。',
        },
        siteName: 'Twitch clip ranking',
        url: 'https://www.twitchclipsranking.com/',
        images: [
            {
                url: "https://www.twitchclipsranking.com/android-chrome-512x512.png",
                width: 512,
                height: 512,
                alt: 'Twitchクリップランキング',
                type: 'image/png',
            }
        ]
    },
    twitter: {
        handle: '@handle',
        site: '@site',
        cardType: "summary_large_image",
    },
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ja">
            <body>
                <main>
                    <Providers>
                        {children}
                    </Providers>
                </main>
            </body>
        </html>
    )
}