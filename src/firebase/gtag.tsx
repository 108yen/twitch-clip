import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const existsGaId = GA_MEASUREMENT_ID !== ''

export function GoogleAnalytics() {
    return (
        <>
            {existsGaId && (
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    />
                    <Script
                        id="gtag-init"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    
                    gtag('config', '${GA_MEASUREMENT_ID}');
                    `,
                        }}
                    />
                </>
            )}
        </>
    );
}

export function usePageView() {
    const router = useRouter();
    useEffect(() => {
        if (!existsGaId) {
            return
        }

        const handleRouterChange = (path: string) => {
            pageview(path);
        };
        router.events.on("routeChangeComplete", handleRouterChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouterChange);
        };
    }, [router.events]);
}

const pageview = (path: string) => {
    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
    });
};


type Event = {
    action: string;
    category: string;
    label: string;
    value: string;
}

//if event analytics
export function event({
    action,
    category,
    label,
    value = ''
}: Event) {
    if (!existsGaId) {
        return
    }

    window.gtag('event', action, {
        event_category: category,
        event_label: JSON.stringify(label),
        value,
    })
}