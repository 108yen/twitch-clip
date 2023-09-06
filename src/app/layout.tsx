import { ReactNode, Suspense } from 'react'
import ThemeRegistry from './_Component/ThemeRegistry';
import DefaultHeader from '@/app/_Component/defaultHeader';
import { Metadata } from 'next';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.URL!),
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
            <head>
                <Suspense>
                    <GoogleAnalytics debugMode={process.env.NEXT_PUBLIC_DEBUG_MODE == '1'} />
                </Suspense>
                <Analytics />
            </head>
            <body>
                <ThemeRegistry options={{ key: 'css', prepend: true }}>
                    <DefaultHeader />
                    {children}
                </ThemeRegistry>
            </body>
        </html>
    )
}
