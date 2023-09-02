'use client'
import { useEffect, useRef } from 'react'
import { event } from "nextjs-google-analytics";
import { usePathname } from 'next/navigation'
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "nextjs-google-analytics";

export function AnalyticsProviders() {
    //GA
    const useNavigationEvent = (onPathnameChange: (pathname: string | null) => void) => {
        const pathname = usePathname(); // Get current route

        // Save pathname on component mount into a REF
        const savedPathNameRef = useRef(pathname);

        useEffect(() => {
            // If REF has been changed, do the stuff
            if (savedPathNameRef.current !== pathname) {
                onPathnameChange(pathname);
                // Update REF
                savedPathNameRef.current = pathname;
            }
        }, [pathname, onPathnameChange]);
    };
    useNavigationEvent((pathname) => {
        event("page_view", {
            page_path: pathname,
        });
    })
    return (
        <>
            {/* Vercel Analytics */}
            <Analytics />
            {/* Google Analytics */}
            <GoogleAnalytics debugMode trackPageViews gaMeasurementId={process.env.NEXT_PUBLIC_GA_ID} />
        </>
    )
}