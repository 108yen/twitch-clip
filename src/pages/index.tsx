import { clipsAtom, tabAtom, usersAtom, viewLayoutAtom } from '@/components/Atoms';
import { Clip, User } from '@/components/types';
import ClipCards from '@/layout/clipCard';
import StreamerCards from '@/layout/streamerCard';
import { Hexagon, HexagonOutlined, ViewArray } from '@mui/icons-material';
import { AppBar, CircularProgress, Divider, Grid, Tab, Tabs, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios, { AxiosRequestConfig } from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import { ArticleJsonLd, NextSeo } from 'next-seo';

export default function Home() {
  const [users, setUsers] = useAtom(usersAtom);
  const [clips, setClips] = useAtom(clipsAtom);
  const [tab, setTab] = useAtom(tabAtom);
  const [viewLayout, setViewLayout] = useAtom(viewLayoutAtom);
  const didLogRef = useRef(false);

  function sortByViewconut(clips: Array<Clip>) {
    return clips.sort((a, b) => b.view_count - a.view_count);
  }

  useEffect(() => {
    async function fetch() {
      await fetchUsers();
      await fetchClips("day");
    }
    if (didLogRef.current === false) {
      didLogRef.current = true;
      fetch();
    }
  }, []);

  async function fetchUsers() {
    const res = await axios.get<Array<User>>('/api/streamers')
      .catch((error) => console.log('streamers api fetch error'));
    if (res?.data != null) {
      setUsers(res?.data);
    }
  }

  async function fetchClips(period: string) {
    const config: AxiosRequestConfig = {
      url: '/api/clips',
      method: 'GET',
      params: {
        period: period,
      },
      paramsSerializer: { indexes: null }
    }
    const res = await axios<Array<Clip>>(config)
      .catch((error) => console.log('clips api fetch error'));
    if (res?.data != null) {
      setClips(sortByViewconut(res?.data));
    }
  }

  function handleTabChange(event: React.SyntheticEvent, newValue: string) {
    setTab(newValue);
    setClips([]);
    fetchClips(newValue);
  }

  function handleLayoutChange(event: React.MouseEvent<HTMLElement>, newAlignment: string) {
    setViewLayout(newAlignment);
  }

  return (
    <>
      <NextSeo
        title="twitch clip ランキング"
        description={"Twitchのクリップのランキング。※すべての配信者の集計ではありません。"}
        openGraph={{
          url: "https://www.twitchclipsranking.com/",
          title: "twitch clip ランキング",
          description: "Twitchのクリップのランキング。※すべての配信者の集計ではありません。",
          images: [
            {
              url: "https://www.twitchclipsranking.com/android-chrome-512x512.png",
            },
          ],
        }}
      />
      <ArticleJsonLd
        url="https://www.twitchclipsranking.com/"
        title="twitch clip ランキング"
        images={["https://www.twitchclipsranking.com/android-chrome-512x512.png"]}
        datePublished="20230312"
        dateModified="20230312"
        authorName="108yen"
        publisherName="108yen"
        publisherLogo=""
        description="Twitchのクリップのランキング。※すべての配信者の集計ではありません。"
      />
      {/* header */}
      <AppBar position='static'>
        <Toolbar>
          <HexagonOutlined
            color='secondary'
            fontSize='large'
            sx={{
              display: { xs: 'none', sm: 'flex' },
              mr: 1
            }}
          />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            twitch clip ranking
          </Typography>
        </Toolbar>
      </AppBar>
      {/* body */}
      <Box sx={{
        flexGrow: 1,
        paddingX: { xs: 0, sm: 3 },
      }}
      >
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                mt: 2,
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
              clips.length == 0 ?
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress color="secondary" />
                </Box> :
                <ClipCards
                  clips={clips}
                  users={users}
                  layout={viewLayout}
                />
            }
          </Grid>
          <Grid item xs={3} display={{ xs: 'none', md: 'flex' }}>
            <StreamerCards streamers={users} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
