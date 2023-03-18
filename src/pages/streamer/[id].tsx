import { usersAtom, clipsAtom, tabAtom, viewLayoutAtom, currentStreamerAtom, currentStreamerIdAtom } from "@/components/Atoms";
import { User, ClipDoc } from "@/components/types";
import ClipCards from "@/layout/clipCard";
import DefaultHeader from "@/layout/defaultHeader";
import StreamerList from "@/layout/streamerList";
import { ViewArray } from "@mui/icons-material";
import { Grid, Box, ToggleButtonGroup, ToggleButton, Tabs, Tab, CircularProgress } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { useAtom } from "jotai";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { useEffect } from "react";
import ViewListIcon from '@mui/icons-material/ViewList';
import { useRouter } from "next/router";
import StreamerCard from "@/layout/streamerCard";

export default function StreamerClip() {
  const [currentStreamer] = useAtom(currentStreamerAtom);
  const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom);
  const [users, setUsers] = useAtom(usersAtom);
  const [clips, setClips] = useAtom(clipsAtom);
  const [tab, setTab] = useAtom(tabAtom);
  const [viewLayout, setViewLayout] = useAtom(viewLayoutAtom);
  const router = useRouter();
  const { id } = router.query;
  const streamerId = isString(id) ? id as string : "summary";

  function isString(value: string | string[] | undefined): boolean {
    return typeof value === "string";
  }
  useEffect(() => {
    async function fetch() {
      setClips({
        day: [],
        week: [],
        month: [],
        all: [],
      });
      if (users.length == 0) {
        await fetchUsers();
      }
      setCurrentStreamerId(streamerId);
      await fetchClips(streamerId);
    }
    if (router.isReady) {
      fetch();
    }
  }, [router]);

  async function fetchUsers() {
    const res = await axios.get<Array<User>>('/api/streamers')
      .catch((error) => console.log('streamers api fetch error'));
    if (res?.data != null) {
      const fetchUsers = res?.data;
      setUsers(fetchUsers);
    }
  }

  async function fetchClips(streamerId: string) {
    const config: AxiosRequestConfig = {
      url: '/api/clips',
      method: 'GET',
      params: {
        id: streamerId,
      },
      paramsSerializer: { indexes: null }
    }
    const res = await axios<ClipDoc>(config)
      .catch((error) => console.log('clips api fetch error'));
    //if data not exist   
    if (res?.data.all != undefined) {
      setClips(res?.data);
    }
  }

  function handleTabChange(event: React.SyntheticEvent, newValue: keyof ClipDoc) {
    setTab(newValue);
  }

  function handleLayoutChange(event: React.MouseEvent<HTMLElement>, newAlignment: string) {
    setViewLayout(newAlignment);
  }
  const title = "twitchクリップランキング | " + currentStreamer?.display_name;
  const description = currentStreamer?.display_name + "のTwitch(ツイッチ)クリップの再生数ランキング。";

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
          <StreamerCard streamer={currentStreamer} />
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
              <Tab label='day' value='day' />
              <Tab label='week' value='week' />
              <Tab label='month' value='month' />
              <Tab label='all' value='all' />
            </Tabs>
          </Box>
          {
            clips['all'].length == 0 ?
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="secondary" />
              </Box> :
              <ClipCards
                clips={clips[tab]}
                users={users}
                layout={viewLayout}
              />
          }
        </Grid>
        <Grid item xs={3} display={{ xs: 'none', md: 'flex' }}>
          <StreamerList streamers={users} />
        </Grid>
      </Grid>
    </>
  );
}