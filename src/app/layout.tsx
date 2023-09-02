import { ReactNode } from 'react'
import { AnalyticsProviders } from '@/components/providers';
import ThemeRegistry from './ThemeRegistry';

export const metadata = {
    title: {
        default: 'Twitchクリップランキング',
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
            default: 'Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。',
            template: '%sのTwitch(ツイッチ)クリップの再生数ランキング。',
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
                {/* <AnalyticsProviders/> */}
                <ThemeRegistry options={{ key: 'mui', prepend: true }}>
                    {children}
                </ThemeRegistry>
            </body>
        </html>
    )
}