// import { headers } from 'next/headers'
import { ReactNode } from 'react'

import DefaultHeader from '@/app/_Component/defaultHeader'

import generateTemplateMetadata from '../utils/generateTemplateMetadata'

import ThemeRegistry from './_Component/ThemeRegistry'

export function generateMetadata() {
    return generateTemplateMetadata()
}

export default function RootLayout({ children }: { children: ReactNode }) {
    // const header = headers()
    // const ip = (header.get(`x-forwarded-for`) ?? ``).split(`,`)[0]

    return (
        <html lang='ja'>
            <head>
                {/* <Suspense> */}
                {/*     <GoogleAnalytics */}
                {/*         debugMode={process.env.NEXT_PUBLIC_DEBUG_MODE == `1`} */}
                {/*         clientIp={ip} */}
                {/*     /> */}
                {/*     <Adsbygoogle /> */}
                {/* </Suspense> */}
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
