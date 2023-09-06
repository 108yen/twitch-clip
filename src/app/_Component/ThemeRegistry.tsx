'use client';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { themeOptions } from '@/theme';
import { useAtom } from 'jotai';
import { isDarkModeAtom } from '@/components/Atoms';
import { useMediaQuery } from '@mui/material';

export default function ThemeRegistry(props: {
    options: { key: string, prepend: boolean },
    children: React.ReactNode
}) {
    const { options, children } = props;
    const [isDarkMode] = useAtom(isDarkModeAtom);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
        noSsr: true,
    });
    const theme = createTheme(themeOptions(
        isDarkMode == undefined ? prefersDarkMode : isDarkMode
    ));

    const [{ cache, flush }] = useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    // __html: styles,
                    __html: options.prepend ? `@layer emotion {${styles}}` : styles,
                }}
            />
        );
    });
    // if (typeof window !== 'undefined') return <>{children}</>

    //これがないとスタイルが崩れる
    const [showScreen, setShowScreen] = useState(false);
    useEffect(() => {
        setShowScreen(true);
    })

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {showScreen ? children : null}
            </ThemeProvider>
        </CacheProvider>
    );
};

// export const EmotionRegistry = ({ children }: { children: React.ReactNode }) => {
//     const [isDarkMode] = useAtom(isDarkModeAtom);
//     const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
//         noSsr: true,
//     });
//     const theme = createTheme(themeOptions(
//         isDarkMode == undefined ? prefersDarkMode : isDarkMode
//     ));

//     const [emotionCache] = useState(() => {
//         const emotionCache = createCache({ key: 'css', prepend: false });
//         emotionCache.compat = true;
//         return emotionCache;
//     });

//     useServerInsertedHTML(() => {
//         return (
//             <style
//                 data-emotion={`${emotionCache.key} ${Object.keys(
//                     emotionCache.inserted
//                 ).join(' ')}`}
//                 key={emotionCache.key}
//                 dangerouslySetInnerHTML={{
//                     __html: Object.values(emotionCache.inserted).join(' '),
//                 }}
//             />
//         );
//     });

//     return (
//         <CacheProvider value={emotionCache}>
//             <ThemeProvider theme={theme}>
//                 <CssBaseline />
//                 {children}
//             </ThemeProvider>
//         </CacheProvider>
//     );
// };