import { ReactNode } from 'react'
import { AnalyticsProviders } from '@/components/providers';
import ThemeRegistry from './ThemeRegistry';
import DefaultHeader from '@/layout/defaultHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.URL ?? 'http://localhost:3000'),
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
        description: 'Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。',
        siteName: 'Twitch clip ranking',
        url: 'https://www.twitchclipsranking.com/',
        images: [
            {
                url: 'https://www.twitchclipsranking.com/android-chrome-512x512.png',
                width: 512,
                height: 512,
                alt: 'Twitchクリップランキング',
                type: 'image/png',
            }
        ]
    },
    twitter: {
        title: {
            default: 'Twitchクリップランキング',
            template: 'Twitchクリップランキング | %s',
        },
        description: 'Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。',
        site: '@site',
        card: 'summary',
        images: [
            {
                url: 'https://www.twitchclipsranking.com/android-chrome-512x512.png',
                width: 512,
                height: 512,
                alt: 'Twitchクリップランキング',
                type: 'image/png',
            }
        ]
    },
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ja">
            <body>
                {/* <AnalyticsProviders/> */}
                {/* <EmotionRegistry> */}
                <ThemeRegistry options={{ key: 'css', prepend: true }}>
                    <DefaultHeader />
                    {children}
                </ThemeRegistry>
                {/* </EmotionRegistry> */}
            </body>
        </html>
    )
}
