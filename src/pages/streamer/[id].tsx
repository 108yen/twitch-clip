import { tabAtom, viewLayoutAtom, currentStreamerAtom, currentStreamerIdAtom } from "@/components/Atoms";
import { ClipDoc } from "@/components/types";
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

export default function StreamerClip() {
  const currentStreamerLoadableAtom = loadable(currentStreamerAtom);
  const [currentStreamerValue] = useAtom(currentStreamerLoadableAtom);

  const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom);
  const [tab, setTab] = useAtom(tabAtom);
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

  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setTab(newValue);
  }

  function handleLayoutChange(event: React.MouseEvent<HTMLElement>, newAlignment: string) {
    setViewLayout(newAlignment);
  }

  const display_name = currentStreamerValue.state === "hasData"
    ? currentStreamerValue.data?.display_name
    : "no data";
  const title = "twitchクリップランキング | " + display_name;
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
          <ClipCards />
        </Grid>
        <Grid item xs={3} display={{ xs: 'none', md: 'flex' }}>
          <StreamerList />
        </Grid>
      </Grid>
    </>
  );
}