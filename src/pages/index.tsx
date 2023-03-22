import { currentStreamerIdAtom, swiperAtom, tabAtom, viewLayoutAtom } from '@/components/Atoms';
import ClipCards from '@/layout/clipCard';
import StreamerList from '@/layout/streamerList';
import { ViewArray } from '@mui/icons-material';
import { Grid, Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Box } from '@mui/system';
import { useAtom } from 'jotai';
import ViewListIcon from '@mui/icons-material/ViewList';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import DefaultHeader from '@/layout/defaultHeader';
import { useEffect } from 'react';
import { Swiper as SwiperCore, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Home() {
  const [tab, setTab] = useAtom(tabAtom);
  const [swiper, setSwiper] = useAtom(swiperAtom);
  const [viewLayout, setViewLayout] = useAtom(viewLayoutAtom);
  const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom);

  useEffect(() => {
    setCurrentStreamerId('summary');
  }, []);

  function handleSlideChange(index: number) {
    setTab(index);
  }
  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setTab(newValue);
    swiper?.slideTo(newValue);
  }

  function handleLayoutChange(event: React.MouseEvent<HTMLElement>, newAlignment: string) {
    setViewLayout(newAlignment);
  }
  const title = "twitchクリップランキング";
  const description = "Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。";

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
      {/* header */}
      <DefaultHeader />
      {/* body */}
      <Grid
        container
        justifyContent='center'
        paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
      >
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              m: 1,
              display: 'flex',
              justifyContent: "flex-end"
            }}
          >
            <ToggleButtonGroup
              size='small'
              exclusive
              value={viewLayout}
              onChange={handleLayoutChange}
            >
              <ToggleButton value="list">
                <ViewListIcon />
              </ToggleButton>
              <ToggleButton value="full">
                <ViewArray />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
            marginBottom: 2,
          }}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              textColor="secondary"
              indicatorColor="secondary"
              centered
            >
              <Tab label='day' value={0} />
              <Tab label='week' value={1} />
              <Tab label='month' value={2} />
              <Tab label='all' value={3} />
            </Tabs>
          </Box>
          <Swiper
            modules={[Virtual]}
            virtual
            onSlideChange={(index) => handleSlideChange(index.activeIndex)}
            onSwiper={(swiper) => {
              const swiperInstance = swiper;
              setSwiper(swiperInstance);
            }}
          >
            {Array.from({ length: 4 }).map((e, index) => (
              <SwiperSlide key={index} virtualIndex={index}>
                <ClipCards />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid item xs={3} display={{ xs: 'none', md: 'flex' }}>
          <StreamerList />
        </Grid>
      </Grid>
    </>
  );
}
