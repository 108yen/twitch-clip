import { headers } from 'next/headers'
import { ReactNode, Suspense } from 'react'

import DefaultHeader from '@/app/_Component/defaultHeader'
import GoogleAnalytics from '@/components/googleAnalytics/GoogleAnalytics'

import Adsbygoogle from '../components/adsense/adsbygoogle'
import generateTemplateMetadata from '../utils/generateTemplateMetadata'

import ThemeRegistry from './_Component/ThemeRegistry'

export const revalidate = 600 // 10minutes

export function generateMetadata() {
    return generateTemplateMetadata()
}

export default function RootLayout({ children }: { children: ReactNode }) {
    const header = headers()
    const ip = (header.get(`x-forwarded-for`) ?? ``).split(`,`)[0]

    return (
        <html lang='ja'>
            <head>
                <Suspense>
                    <GoogleAnalytics
                        debugMode={process.env.NEXT_PUBLIC_DEBUG_MODE == `1`}
                        clientIp={ip}
                    />
                    <Adsbygoogle />
                </Suspense>
            </head>
            <body>
                <ThemeRegistry options={{ key: `css`, prepend: true }}>
                    <DefaultHeader />
                    {children}
                </ThemeRegistry>
            </body>
        </html>
    )
}
