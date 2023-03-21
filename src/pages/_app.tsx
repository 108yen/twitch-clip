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
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <DefaultSeo
        defaultTitle='twitchクリップランキング'
        description='Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。'

        openGraph={{
          type: 'website',
          title: 'twitchクリップランキング',
          description: 'Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。',
          siteName: 'twitch clip ranking',
          url: 'https://www.twitchclipsranking.com/',
          images: [
            {
              url: "https://www.twitchclipsranking.com/android-chrome-512x512.png",
              width: 512,
              height: 512,
              alt: 'twitchクリップランキング',
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
        <CssBaseline />
        {show_screen ? <Component {...pageProps} /> : null}
        <Analytics />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp