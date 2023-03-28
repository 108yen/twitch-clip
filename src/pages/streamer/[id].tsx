import { tabAtom, viewLayoutAtom, currentStreamerAtom, currentStreamerIdAtom, swiperAtom, tabNameAtom, tabNameListAtom } from "@/components/Atoms";
import ClipCards from "@/layout/clipCard";
import DefaultHeader from "@/layout/defaultHeader";
import StreamerList from "@/layout/streamerList";
import { ViewArray } from "@mui/icons-material";
import { Grid, Box, ToggleButtonGroup, ToggleButton, Tabs, Tab } from "@mui/material";
import { useAtom } from "jotai";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { useEffect } from "react";
import ViewListIcon from '@mui/icons-material/ViewList';
import { useRouter } from "next/router";
import StreamerCard from "@/layout/streamerCard";
import { loadable } from "jotai/utils";
import { Swiper as SwiperCore, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/virtual';

export default function StreamerClip() {
  const currentStreamerLoadableAtom = loadable(currentStreamerAtom);
  const [currentStreamerValue] = useAtom(currentStreamerLoadableAtom);

  const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom);
  const [tab, setTab] = useAtom(tabAtom);
  // tab name list
  const tabNameListLoadableAtom = loadable(tabNameListAtom);
  const [tabNameListValue] = useAtom(tabNameListLoadableAtom);
  const tabNameList = tabNameListValue.state === "hasData"
    ? tabNameListValue.data
    : ["day", "week", "month", "all"];
  // swipe
  const [swiper, setSwiper] = useAtom(swiperAtom);
  //layout
  const [viewLayout, setViewLayout] = useAtom(viewLayoutAtom);
  const router = useRouter();
  const { id } = router.query;
  const streamerId = isString(id) ? id as string : "summary";

  function isString(value: string | string[] | undefined): boolean {
    return typeof value === "string";
  }

  useEffect(() => {
    if (router.isReady) {
      setCurrentStreamerId(streamerId);
    }
  }, [router]);

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

  const display_name = currentStreamerValue.state === "hasData"
    ? currentStreamerValue.data?.display_name
    : "no data";
  const title = "Twitchクリップランキング | " + display_name;
  const description = display_name + "のTwitch(ツイッチ)クリップの再生数ランキング。";

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
          <StreamerCard />
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
            justifyContent: 'center',
            display: 'flex',
          }}>
            <Tabs
              variant="scrollable"
              value={tab}
              onChange={handleTabChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              {tabNameList.map((e, index) => <Tab key={index} label={e} value={index} />)}
            </Tabs>
          </Box>
          <Swiper
            modules={[Virtual]}
            virtual
            spaceBetween={100}
            slidesPerView={1}
            simulateTouch={false}
            onSlideChange={(index) => handleSlideChange(index.activeIndex)}
            onSwiper={(swiper) => {
              const swiperInstance = swiper;
              setSwiper(swiperInstance);
            }}
          >
            {Array.from({ length: tabNameList.length }).map((e, index) => (
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