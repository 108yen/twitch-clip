import { currentStreamerIdAtom } from '@/components/Atoms';
import { useAtom } from 'jotai';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import DefaultHeader from '@/layout/defaultHeader';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/virtual';
import ClipsPageBody from '@/layout/clipsPageBody';
import { Box, Grid } from '@mui/material';
import StreamerList from '@/layout/streamerList';
import { BorderPaper } from '@/components/styledui';
import SideClipCard from '@/layout/sideClipCard';

export default function Home() {
  const title = "Twitchクリップランキング";
  const description = "Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。";
  //set clicked clip
  const [currentClip, setCurrentClip] = useState('');
  function handleSetClip(clipUrl: string) {
    setCurrentClip(clipUrl);
  }

  const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom);

  useEffect(() => {
    setCurrentStreamerId('summary');
  }, []);

  function ClipListLayout() {
    return (
      <Grid
        container
        justifyContent='center'
        paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
      >
        <Grid item zeroMinWidth xs={12} md={9}>
          <ClipsPageBody
            setClickedClipUrl={handleSetClip}
          />
        </Grid>
        <Grid item zeroMinWidth xs={3} display={{ xs: 'none', md: 'flex' }}>
          <StreamerList />
        </Grid>
      </Grid>
    );
  }

  function ClipViewLayout() {
    return (
      <Grid
        container
        justifyContent='center'
        paddingX={{ xs: 0, md: 5 }}
        spacing={4}
      >
        <Grid item xs={12} md={9}>
          <BorderPaper
            sx={{
              marginY: { xs: 0, md: 5 }
          }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 0,
                paddingBottom: '56.25%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <iframe
                src={currentClip + '&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com'}
                allowFullScreen
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </Box>
          </BorderPaper>
        </Grid>
        <Grid item zeroMinWidth xs={3} display={{ xs: 'none', md: 'flex' }}>
          <SideClipCard
            setClickedClipUrl={handleSetClip}
          />
        </Grid>
        <Grid item zeroMinWidth xs={12} display={{ xs: 'flex', md: 'none' }}>
          <ClipsPageBody
            setClickedClipUrl={handleSetClip}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: "https://www.twitchclipsranking.com/",
          title: title,
          description: description,
          images: [
            {
              url: "https://www.twitchclipsranking.com/android-chrome-512x512.png",
            },
          ],
        }}
      />
      <ArticleJsonLd
        url="https://www.twitchclipsranking.com/"
        title={title}
        images={["https://www.twitchclipsranking.com/android-chrome-512x512.png"]}
        datePublished="20230312"
        dateModified="20230312"
        authorName="108yen"
        publisherName="108yen"
        publisherLogo=""
        description={description}
      />
      <DefaultHeader />
      {currentClip == '' ? <ClipListLayout /> : <ClipViewLayout />}

    </>
  );
}
