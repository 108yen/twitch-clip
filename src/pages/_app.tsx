import Head from 'next/head';
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import { useEffect, useState } from 'react';
import { DefaultSeo } from 'next-seo';
import { Analytics } from '@vercel/analytics/react';
import { createTheme, useMediaQuery } from '@mui/material';
import { themeOptions } from '@/theme';
import { useAtom } from 'jotai';
import { isDarkModeAtom } from '@/components/Atoms';
import { GoogleAnalytics } from "nextjs-google-analytics";
import router from 'next/router';
import { event } from "nextjs-google-analytics";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [show_screen, setShowScreen] = useState(false)
  const [isDarkMode] = useAtom(isDarkModeAtom);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  });
  const theme = createTheme(themeOptions(
    isDarkMode == undefined ? prefersDarkMode : isDarkMode
  ));

  useEffect(() => {
    setShowScreen(true)
  }, []);

  //GA
  useEffect(() => {
    function handleComplete(path: string) {
      event("page_view", {
        page_path: path,
      });
    }
    router.events.on("routeChangeComplete", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router.events]);


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <DefaultSeo
        defaultTitle='Twitchクリップランキング'
        description='Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。'

        openGraph={{
          type: 'website',
          title: 'Twitchクリップランキング',
          description: 'Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。',
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
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: "summary_large_image",
        }}
      />
      <ThemeProvider theme={theme}>
        {/* Vercel Analytics */}
        <Analytics />
        {/* Google Analytics */}
        <GoogleAnalytics debugMode trackPageViews gaMeasurementId={process.env.NEXT_PUBLIC_GA_ID} />
        <CssBaseline />
        {show_screen ? <Component {...pageProps} /> : null}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp