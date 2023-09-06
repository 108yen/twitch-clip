'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

import { existsGaId, GA_MEASUREMENT_ID, event } from './gtag'

export default function GoogleAnalytics({ debugMode = false }) {
    const pathname = usePathname()
    
    useEffect(() => {
        if (!existsGaId) {
            return
        }
        event("page_view", {
            page_path: pathname,
        });
    }, [pathname])

    return (
        <>
            <Script
                strategy='lazyOnload'
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script id='gtag-init' strategy='afterInteractive'>
                {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                            ${debugMode ? `debug_mode: ${debugMode},` : ""}
                        });
                    `}
            </Script>
        </>
    )
}